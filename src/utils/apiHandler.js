let prevAntSpace = 0;

export const setFreqApi = async (data, url) => {
  try {
    const response = await fetch(url + "/api/settings/freq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("Frequency set successfully: ", jsonResponse);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const setAntena = async (antSpace, url) => {
  if (prevAntSpace === antSpace) {
    console.log("Antenna spacing is already set to ", antSpace);
    return;
  }

  let typeAnt = "vhf";
  if (antSpace <= 0.25) {
    typeAnt = "uhf";
  }

  try {
    const response = await fetch(url + "/api/ant/" + typeAnt, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("Antenna set successfully to: ", jsonResponse);
      prevAntSpace = antSpace;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};
