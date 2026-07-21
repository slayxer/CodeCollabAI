import API from "./api";

// ============================
// Get Profile
// ============================

export const getProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get("/auth/profile", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    return response.data;

};

// ============================
// Update Profile
// ============================

export const updateProfile = async (profileData) => {

    const token = localStorage.getItem("token");

    const response = await API.put(

        "/auth/profile",

        profileData,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};