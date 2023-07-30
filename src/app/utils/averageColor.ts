import {NgZone} from "@angular/core";
import {map, pipe} from "rxjs";


export default function getAverageColor(imgEl: HTMLImageElement, zone: NgZone) {
    return pipe(map(() => {
        return zone.runOutsideAngular(() => {
            imgEl.hidden = false;
            const canvas = document.createElement('canvas');
            canvas.width = imgEl.width;
            canvas.height = imgEl.height;

            // Draw the image on the canvas
            const ctx = canvas.getContext && canvas.getContext('2d');

            if (!ctx) {
                return `rgb(255, 255, 255)`;
            }

            ctx.drawImage(imgEl, 0, 0);
            // Get pixel data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            let totalRed = 0;
            let totalGreen = 0;
            let totalBlue = 0;
            let count = 0;
            // Calculate sum of color values
            for (let i = 0; i < imageData.length; i += 4) {
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];
                if (red === 0 && green === 0 && blue === 0) {
                    continue;
                }
                totalRed += red
                totalGreen += green
                totalBlue += blue

                count++;
            }

            // Calculate average color
            const avgRed = Math.round(totalRed / count);
            const avgGreen = Math.round(totalGreen / count);
            const avgBlue = Math.round(totalBlue / count);

            // Create average color in RGB format
            return `rgb(${avgRed.toFixed()}, ${avgGreen.toFixed()}, ${avgBlue.toFixed()})`
        })
    }))
}
