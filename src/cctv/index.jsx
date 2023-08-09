import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedPhase,
  addSelectedSector,
  removeSelectedPhase,
  removeSelectedSector,
  togglePhase,
  toggleSector,
} from "../store/cctvSlice";
// import data from "../data/cctv.json";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import cctvDataSlice, { cctvDataActions } from "../store/cctvData";

export default function Cctv() {
  const newdata = useSelector((state) => state.cctvData.items);
  const storedToken = localStorage.getItem("authToken");
  console.log("storedToken in cctv=-=============-=", storedToken);
  const navigate = useNavigate();
  const locations = [
    {
      phase: "phase - I",
      sectors: [
        "A",
        "Sector A1",
        "B",
        "Sector B1",
        "C",
        "D",
        "E",
        "Defence Avenue",
        "Sector B Orchard",
        "Sector C Orchard",
      ],
    },
    {
      phase: "phase - II",
      sectors: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    },
  ];
  const [data, setData] = useState(null);
  const apiUrl = "https://memberappapi.dhai-r.com.pk/api/SurveyData/get";
  const bearerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3VydmV5QGRoYS5jb20iLCJqdGkiOiJmZjJiOGYzOS1jNDg2LTQzYjYtOTU3ZS04YzdhNzYwOTc2YWYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXJ2ZXkiLCJleHAiOjE3MjIwODI3OTYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.G7X-ZZsakeJxV0Nwrb7E77jcZHjX0S2vlYFms2MpMJA";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(cctvDataActions.addCctvData(responseData.data)); // Store the 'data' array in the state
        console.log(responseData.data);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      // Handle the error
      console.error("Error fetching data:", error);
    }
  };
  console.log("datadatadatadatadatadatadatadatadatadatadatadatadatadata", data);
  const dispatch = useDispatch();
  const selectedPhases = useSelector((state) => state.cctv.selectedPhases);
  const selectedSectors = useSelector((state) => state.cctv.selectedSectors);

  const handlePhaseCheckboxChange = (event) => {
    const { id, checked } = event.target;

    dispatch(togglePhase(id));

    if (checked) {
      const phaseSectors = locations.find(
        (location) => location.phase === id
      ).sectors;
      phaseSectors.forEach((sector) => {
        if (!selectedSectors.includes(sector)) {
          dispatch(toggleSector(sector));
        }
      });
    } else {
      const phaseSectors = locations.find(
        (location) => location.phase === id
      ).sectors;
      phaseSectors.forEach((sector) => {
        if (selectedSectors.includes(sector)) {
          dispatch(toggleSector(sector));
        }
      });
    }
  };

  const handleSectorCheckboxChange = (event) => {
    const { id, checked } = event.target;

    dispatch(toggleSector(id));

    const sectorPhase = locations.find((location) =>
      location.sectors.includes(id)
    );
    console.log(
      "sectorPhase sectorPhase sectorPhase ............",
      sectorPhase
    );
    if (checked && sectorPhase && !selectedPhases.includes(sectorPhase.phase)) {
      dispatch(togglePhase(sectorPhase.phase));
    }
  };
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.clear();
    const getToken = localStorage.getItem("authToken");
    if (!getToken) {
      navigate("/");
    }
  };
  // const handlePhaseCheckboxChange = (event) => {
  //   const { id, checked } = event.target;

  //   if (checked) {
  //     dispatch(addSelectedPhase(id));
  //     const phaseSectors = locations.find(
  //       (location) => location.phase === id
  //     ).sectors;
  //     console.log("phaseSectors=====",phaseSectors);
  //     phaseSectors.forEach((sector) => dispatch(addSelectedSector(sector)));
  //   } else {
  //     dispatch(removeSelectedPhase(id));
  //     const phaseSectors = locations.find(
  //       (location) => location.phase === id
  //     ).sectors;
  //     phaseSectors.forEach((sector) => {
  //       if (!selectedSectors.includes(sector)) {
  //         dispatch(removeSelectedSector(sector));
  //       }
  //     });
  //   }
  // };

  // const handleSectorCheckboxChange = (event) => {
  //   const { id, checked } = event.target;

  //   if (checked) {
  //     dispatch(addSelectedSector(id));
  //     const sectorPhase = locations.find((location) =>
  //       location.sectors.includes(id)
  //     );

  //     if (sectorPhase && !selectedPhases.includes(sectorPhase.phase)) {
  //       dispatch(addSelectedPhase(sectorPhase.phase));
  //     }
  //   } else {
  //     dispatch(removeSelectedSector(id));
  //     const sectorPhase = locations.find((location) =>
  //       location.sectors.includes(id)
  //     );

  //     // Check if the sector belongs to any phase and remove the phase if no sectors from that phase are selected
  //     if (sectorPhase) {
  //       const phaseSectors = locations.find(
  //         (location) => location.phase === sectorPhase.phase
  //       ).sectors;
  //       const areAnyPhaseSectorsSelected = phaseSectors.some((sector) =>
  //         selectedSectors.includes(sector)
  //       );

  //       if (!areAnyPhaseSectorsSelected) {
  //         dispatch(removeSelectedPhase(sectorPhase.phase));
  //       }
  //     }
  //   }
  // };

  const filteredData = newdata
    ? newdata.filter(
        (item) =>
          selectedSectors.includes(item.sector) ||
          selectedPhases.includes(item.phase)
      )
    : [];
  return (
    <div style={{ display: "flex" }}>
      <button onClick={handleLogout}>logout</button>
      <div className="w-1/4">
        <Accordion>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {locations.map((location, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  //   expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <input
                    type="checkbox"
                    id={location.phase}
                    checked={
                      selectedPhases.includes(location.phase) ||
                      location.sectors.every((sector) =>
                        selectedPhases.includes(sector)
                      )
                    }
                    onChange={handlePhaseCheckboxChange}
                  />
                  <label htmlFor={location.phase}>{location.phase}</label>
                </AccordionSummary>
                {location.sectors.map((sector, i) => (
                  <AccordionDetails key={i}>
                    <input
                      type="checkbox"
                      id={sector}
                      checked={selectedSectors.includes(sector)}
                      onChange={handleSectorCheckboxChange}
                    />
                    <label htmlFor={sector}>{sector}</label>
                  </AccordionDetails>
                ))}
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="w-full ">
        {filteredData.map((item) => (
          <div key={item.id}>
            <p style={{ padding: "15px" }}>{item.category}</p>
            <p>{item.phase}</p>
            <p>{item.sector}</p>
          </div>
        ))}
        {/* <Map /> */}
      </div>
    </div>
  );
}
