import { useLocation } from "react-router-dom";

export default function useIsPage(): {
    isLandingPage: boolean;
} {
    const { pathname } = useLocation();
    return {
        isLandingPage: !pathname || pathname === `/`
    };
}