import { create } from 'zustand';
import axios from 'axios';

const useRegionConstituencyStore = create((set) => ({
  regions: [],
  constituenciesByRegion: {},
  selectedRegion: '',
  filteredConstituencies: [],

  fetchRegionsAndConstituencies: async () => {
    try {
      const [regionRes, constRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/regions'),
        axios.get('http://127.0.0.1:8000/api/constituency')
      ]);

      // Log both responses to confirm structure
      console.log("Region response:", regionRes.data);
      console.log("Constituency response:", constRes.data);

      const regionData = Array.isArray(regionRes.data?.data?.data)
        ? regionRes.data.data.data
        : []; // fallback to empty array if it's not an array
      const constituencyData = Array.isArray(constRes.data?.data?.data)
      ? constRes.data.data.data
      : [];

      const grouped = {};
      for (const con of constituencyData) {
        const regionId = con.region_id;
        if (!grouped[regionId]) grouped[regionId] = [];
        grouped[regionId].push(con);
      }

      set({
        regions: regionData,
        constituenciesByRegion: grouped
      });
    } catch (err) {
      console.error('Error fetching region/constituency:', err);
    }
  },

  setSelectedRegion: (regionId) =>
    set((state) => ({
      selectedRegion: regionId,
      filteredConstituencies: state.constituenciesByRegion[regionId] || []
    }))
}));

export default useRegionConstituencyStore;
