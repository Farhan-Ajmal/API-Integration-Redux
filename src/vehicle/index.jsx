import { useState, useEffect } from "react";
import AllImages from "../allImages";

const Vehicles = () => {
  const [mergedData, setMergedData] = useState([]);
  const mergeDevicePositionData = (devicesData, positionsData) => {
    return devicesData.map((device) => {
      const position = positionsData.find(
        (position) => position.deviceId === device.id
      );
      //   console.log("position",Object.keys(position).length);
      return {
        ...device,
        position: position || null,
      };
    });
  };
  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const username = "survey@dha.com";
      const password = "Pakistan@123";
      const authHeader = "Basic " + btoa(username + ":" + password);

      const positionsResponse = await fetch(
        "https://vtrackingsys.com/api/positions",
        {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        }
      );
      const devicesResponse = await fetch(
        "https://vtrackingsys.com/api/devices",
        {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (devicesResponse.ok || positionsResponse.ok) {
        const devicesData = await devicesResponse.json();
        const positionsData = await positionsResponse.json();
        console.log("devicesData", devicesData);
        console.log("positionsData", positionsData);
        const merged = mergeDevicePositionData(devicesData, positionsData);
        console.log("merged", merged);
        setMergedData(merged);
        // Assuming dispatch and cctvDataActions are properly defined
        // dispatch(cctvDataActions.addCctvData(apiResponse.data))
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("error is", error);
    }
  };
  console.log("mergedData------------", mergedData);
  const getIcon = (category, course) => {
    if (category === "car") {
      if (course <= 180) {
        return AllImages.carLeft;
      } else if (course >= 180) {
        return AllImages.carRight;
      } else {
        return AllImages.car;
      }
    } else if (category === "truck") {
      return AllImages.truck;
    } else {
      return AllImages.default;
    }
  };
  return (
    <div>
      {mergedData.map((x) => (
        <div>
          <div style={{ padding: "10px", background: "red" }}>
            <img
              style={{ width: "30px", height: "30px" }}
              src={getIcon(x.category, x.position ? x.position.course : 0)}
            />
          </div>
          {x.position ? (
            <div>
              latitude:{x.position.latitude}course{x.position.course}
            </div>
          ) : (
            <div>no data found</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Vehicles;
