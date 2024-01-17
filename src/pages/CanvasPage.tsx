import React from "react";
import { DesignArea } from "../components/canvas/DesignArea";
import { LeftPanel } from "../components/canvas/LeftPanel";
import { RightPanel } from "../components/canvas/RightPanel";
import { TopBar } from "../components/canvas/TopBar";

export const CanvasPage = (): JSX.Element => {
    return (
        <div className="grow flex flex-col text-white">
            <TopBar/>
            <div className="grow flex">
                <LeftPanel/>
                <DesignArea/>
                <RightPanel/>
            </div>
        </div>
    );
};


export default CanvasPage;
