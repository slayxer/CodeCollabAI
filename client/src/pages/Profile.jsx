import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileStats from "../components/profile/ProfileStats";

import { getProfile } from "../services/profileService";

import "../styles/profile.css";

function Profile() {

    const [user, setUser] = useState(null);

    const loadProfile = async () => {

        try {

            const res = await getProfile();

            setUser(res.user);

        }

        catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadProfile();

    }, []);

    if (!user) {

        return <h2 style={{ color: "white" }}>Loading...</h2>;

    }

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="profile-container">

                <h1 className="page-title">

                    My Profile

                </h1>

                <ProfileCard

                    user={user}

                    refreshProfile={loadProfile}

                />

                <ProfileStats />

            </div>

        </div>

    );

}

export default Profile;