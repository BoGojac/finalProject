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

      const grouped = {};
      for (const con of constRes.data.data) {
        const regionId = con.region_id;
        if (!grouped[regionId]) grouped[regionId] = [];
        grouped[regionId].push(con);
      }

      set({
        regions: regionRes.data.data,
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
