export interface SocialItem {
  name: string;
  icon: any;
}

export interface SidebarProps {
  title: string;
  description: string;
  social: SocialItem[];
}

export interface ContentProps {
  Title: string;
  Date: string;
  Views: number;
  slug: string;
  content: string;
  ImageContent: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export interface ContentResponse {
  id: number;
  attributes: ContentProps;
}
