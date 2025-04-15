import toast from "react-hot-toast";

export const showError = (message: string) => {
    toast.error(message, {
        duration: 4000,
        position: "top-right",
        style: {
            background: "#1F2937",
            color: "#F87171",
            border: "1px solid #374151",
            zIndex: 9999,
            padding: "16px",
            borderRadius: "8px",
            boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
    });
};

export const showSuccess = (message: string) => {
    toast.success(message, {
        duration: 3000,
        position: "top-right",
        style: {
            background: "#1F2937",
            color: "#34D399",
            border: "1px solid #374151",
            zIndex: 9999,
            padding: "16px",
            borderRadius: "8px",
            boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
    });
};
