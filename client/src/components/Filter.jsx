import React, { useEffect } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./util/FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, artists}, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };
  return (
      <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
        <FilterButtons filterData={artists} flag={"Artist"} />

        <div className=" flex items-center gap-6 mx-4">
          {filters?.map((data) => (
              <p
                  key={data.id}
                  onClick={() => updateFilter(data.value)}
                  className={`text-base ${
                      data.value === filterTerm ? "font-semibold" : "font-normal"
                  } text-textColor cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
              >
                {data.name}
              </p>
          ))}
        </div>

        <FilterButtons filterData={filterByLanguage} flag={"Language"} />

        <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={clearAllFilter}
        >
          <MdClearAll className="text-textColor text-xl cursor-pointer" />
        </motion.i>
      </div>
  );
};

export default Filter;