import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Data from "./Data.json";

//style

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    border: "2px solid black",

    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,54,1) 21%, rgba(31,161,204,1) 86%, rgba(0,212,255,1) 100%)",
  },
  pp: {
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
  },

  box: {
    position: "absolute",
    top: "12vh",
    padding: "1rem",

    "& Input": {
      padding: "1rem",
      width: "55rem",
      fontSize: "1.5rem",
    },
  },
  notFound: {
    fontSize: "2rem",
  },
  resultDisp: {
    lineHeight: 0.5,
    width: "55rem",
    padding: "1rem",
    border: "2px solid black",
    background: "#cfe2f3",
  },
  padding: {
    padding: ".5rem",
  },
}));

function App() {
  const classes = useStyles();
  const [queryData, setQueryData] = useState("");
  const [searchResult, setResults] = useState([]);
  const [empty, setEmpty] = useState(false);

  const dbSearchData = useDebounce(queryData, 3000); //delay
  function useDebounce(key, delay) {
    const [debouncedValue, setDebouncedValue] = useState(key);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(key);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [key, delay]);

    return debouncedValue;
  }

  useEffect(() => {
    if (dbSearchData) {
      const filter = Data.filter((i) => {
        return i.author.toLowerCase().startsWith(dbSearchData.toLowerCase());
      });

      if (IsEmpty(filter) === 1) {
        setEmpty(true);
      } else {
        setEmpty(false);
        setResults(filter);
      }
    } else {
      setResults([]);
    }
  }, [dbSearchData]);

  function IsEmpty(result) {
    if (result.length === 0) {
      return 1;
    }
    return null;
  }

  const handleChange = (e) => {
    setQueryData(e.target.value);
    if (e.target.value === "") setEmpty(false);
  };
  return (
    <div className={classes.root}>
      <p className={classes.pp}>Last Assignment</p>
      <div className={classes.box}>
        <input
          type={"text"}
          name={"Search"}
          placeholder={"Search By Author Name"}
          onChange={handleChange}
        />
        {/* {queryData?.lenght > 0 && (
          <div className={classes.autocomp}>
            {queryData?.map((el, i) => (
              <div key={i} className={classes.autoCompItems}>
                <span> </span>
              </div>
            ))}
          </div>
        )} */}

        {empty && (
          <div>
            <h1 className={classes.notFound}>Search Results Not Found</h1>
          </div>
        )}
        {searchResult.map((result) => (
          <div key={result.isbn} className={classes.resultDisp}>
            <h2 className={classes.padding}>Isbn:{" " + result.isbn}</h2>
            <h2 className={classes.padding}>Title:{" " + result.title}</h2>
            <h2 className={classes.padding}>
              Subtitle:{" " + result.subtitle}
            </h2>
            <h2 className={classes.padding}>Author:{" " + result.author}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
