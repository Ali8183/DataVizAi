import { create } from 'zustand';

const useDataStore = create((set) => ({
    data: null,
    fileName: null,
    fileSize: null,
    columns: [],
    status: 'idle', // idle, uploading, analyzing, ready, error
    error: null,

    setFile: (fileInfo) => set({
        fileName: fileInfo.name,
        fileSize: fileInfo.size,
        status: 'uploading',
        error: null
    }),

    setData: (data) => set({ data }),

    setColumns: (columns) => set({ columns }),

    setAnalysisResult: (data, columns) => set({
        data,
        columns,
        status: 'ready'
    }),

    setStatus: (status) => set({ status }),

    setError: (error) => set({
        error,
        status: 'error'
    }),

    reset: () => set({
        data: null,
        fileName: null,
        fileSize: null,
        columns: [],
        status: 'idle',
        error: null
    })
}));

export default useDataStore;
