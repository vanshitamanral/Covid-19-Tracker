import React from 'react';
import "./InfoBox.css";
import {Card, CardContent, Typography} from '@material-ui/core'

function infoBox({title,cases,total}) {
    return (
        <div className="infoBox">
            <Card>
                <CardContent>
                    <Typography className="InfoBox__title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className="InfoBox__cases">{cases}</h2>
                    <Typography className="InfoBox__total" color="textSecondary">{total} Total</Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default infoBox;
