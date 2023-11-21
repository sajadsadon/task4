import { useState } from "react";
import { useAppStore } from "../../store";
import "./search.css";
import { FiSearch } from "react-icons/fi";


const Search=()=>{
    const [value, setValue] = useState();
    const { setSearchKey } = useAppStore();
  
    return(
        <div className="search-box">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Find product"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchKey(value);
            }
          }}
        />
        <button onClick={() => setSearchKey(value)}>
          <FiSearch />
        </button>
      </div>
    )
}
export default Search;