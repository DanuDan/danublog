import axios from "axios";

const url = process.env.NEXT_PUBLIC_HOST_API || " ";
const token = process.env.NEXT_PUBLIC_TOKEN_API || " ";

export const getContents = async () => {
  try {
    const headers = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const contents = await axios.get(`${url}api/contents?populate=*`, headers);
    return contents.data;
  } catch (error) {
    console.log(error);
  }
};

export const getContent = async ({ slug }: { slug: string }) => {
  try {
    const headers = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const contents = await axios.get(
      `${url}api/contents?filters[slug][$eq]=${slug}&populate=*`,
      headers,
    );
    return contents.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchContent = async (title: string) => {
  try {
    const headers = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const contents = await axios.get(
      `${url}api/contents?filters[Title][$contains]=${title}&populate=*`,
      headers,
    );
    return contents.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateView = async (id: number, value: number) => {
  try {
    const headers = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const request = {
      data: {
        Views: ++value,
      },
    };
    const response = await axios.put(
      `${url}api/contents/${id}`,
      request,
      headers,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
