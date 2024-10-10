import SimpleCard from "../rules/Card";
import React from 'react';
import { Box } from "@material-ui/core";


export default function Rules() {
    return(
        <div>
            <div className="rulesTopSection">
                <div className="placeHolder">Image PlaceHolder</div>
                <Box style={{
    width: "300px",
    height: "300px",
                }}>
                    <SimpleCard />
                </Box>
            </div>

            <div className='rulesCard'>
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
            </div>
        </div>
    )
}