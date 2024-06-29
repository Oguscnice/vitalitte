export interface FileInfo {
  title: string;
  data: {
    display_url : string;
    image: { url: string };
    medium: { url: string };
    thumb: { url: string };
  };
}