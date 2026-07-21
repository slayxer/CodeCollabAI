import { FaBell, FaMoon } from "react-icons/fa";

function DashboardHeader() {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
                color: "#ffffff"
            }}
        >

            <div>

                <h1
                    style={{
                        color: "#ffffff",
                        fontSize: "42px",
                        fontWeight: "700",
                        marginBottom: "10px"
                    }}
                >
                    Welcome Back 👋
                </h1>

                <p
                    style={{
                        color: "#d1d5db",
                        fontSize: "18px"
                    }}
                >
                    Ready to build something amazing today?
                </p>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "22px",
                    fontSize: "24px",
                    color: "#ffffff"
                }}
            >
                <FaBell />
                <FaMoon />
            </div>

        </div>

    );

}

export default DashboardHeader;