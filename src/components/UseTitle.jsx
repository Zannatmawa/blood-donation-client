import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Blood Bridge`;
    }, [title]);
};

export default useTitle;
