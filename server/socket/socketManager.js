const activeUsers = {};

function initializeSocket(io) {

    io.on("connection", (socket) => {

        console.log("✅ User Connected:", socket.id);

        // ============================
        // Join Project Room
        // ============================

        socket.on("join-project", ({ projectId, user }) => {

            socket.join(projectId);

            activeUsers[socket.id] = {
                projectId,
                user
            };

            io.to(projectId).emit(
                "users-update",
                Object.values(activeUsers).filter(
                    u => u.projectId === projectId
                )
            );

            console.log(`${user} joined ${projectId}`);

        });

        // ============================
        // Live Code Changes
        // ============================

        socket.on("code-change", (data) => {

            socket.to(data.projectId).emit(
                "receive-code",
                data
            );

        });

        // ============================
        // File Explorer Updates
        // ============================

        socket.on("file-created", (data) => {

            socket.to(data.projectId).emit(
                "refresh-files"
            );

        });

        socket.on("file-renamed", (data) => {

            socket.to(data.projectId).emit(
                "refresh-files"
            );

        });

        socket.on("file-deleted", (data) => {

            socket.to(data.projectId).emit(
                "refresh-files"
            );

        });

        // ============================
        // Typing Indicator
        // ============================

        socket.on("typing", ({ projectId, user }) => {

            socket.to(projectId).emit(
                "user-typing",
                user
            );

        });

        // ============================
        // Cursor Position
        // ============================

        socket.on("cursor-change", (data) => {

            socket.to(data.projectId).emit(
                "receive-cursor",
                data
            );

        });

        // ============================
        // Leave Project
        // ============================

        socket.on("leave-project", () => {

            const user = activeUsers[socket.id];

            if (!user) return;

            socket.leave(user.projectId);

            delete activeUsers[socket.id];

            io.to(user.projectId).emit(
                "users-update",
                Object.values(activeUsers).filter(
                    u => u.projectId === user.projectId
                )
            );

            console.log(`${user.user} left ${user.projectId}`);

        });

        // ============================
        // Disconnect
        // ============================

        socket.on("disconnect", () => {

            const user = activeUsers[socket.id];

            if (user) {

                delete activeUsers[socket.id];

                io.to(user.projectId).emit(
                    "users-update",
                    Object.values(activeUsers).filter(
                        u => u.projectId === user.projectId
                    )
                );

                console.log(`${user.user} disconnected`);

            }

            console.log("❌ User Disconnected:", socket.id);

        });

    });

}

module.exports = initializeSocket;