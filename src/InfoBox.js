import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

function infoBox({title,cases,total}) {
    return (
        <div>
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
