export interface ICohortsByLevel {
  _id: string;
  name: string;
  year: string;
  session: {name: string};
  levels: ILevel[];
}
export interface ICohorts {
  _id: string;
  name: string;
  year: string;
  session: {name: string};
  modules: IModule[];
}

export type ILevel = {
  level: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Additional Resource';
  modules: IModule[];
};
export type IModule = {
  _id: string;
  name: string;
  displayOrder: number;
  days: IDay[];
};
export type IDay = {
  _id: string;
  title: string;
  videos: IFile[];
  pdfs: IFile[];
  docs: IFile[];
  ppts: IFile[];
};
export type IFile = {
  url: string;
  title: string;
  viewUrl?: string;
  downloadUrl?: string;
  isDownloadable: boolean;
  _id: string;
};
export type FileType = 'pdf' | 'ppt' | 'video';
