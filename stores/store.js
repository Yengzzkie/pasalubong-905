import { create } from "zustand";

export const useFileUploadStore = create((set) => ({
    imgFiles: [],
    setImgFiles: (imgFiles) => set({ imgFiles }),
}))

export const useStoreUserData = create((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));

export const usePostSearchResult = create((set) => ({
  postSearchResult: null,
  setPostSearchResult: (data) => set({ postSearchResult: data }),
}));

export const useSearchQuery = create((set ) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query})
}))

export const useOpenSendMessage = create((set) => ({
  openSendMessage: false,
  setOpenSendMessage: (open) => set({ openSendMessage: open }),
}));
