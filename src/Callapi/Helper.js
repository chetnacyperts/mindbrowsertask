import axios from "axios";

export const fetchCharacters = async () => {
  try {
    const result = await axios.get(`https://rickandmortyapi.com/api/character`);
    return result.data;
  } catch (error) {
    // console.log(error);
  }
};

