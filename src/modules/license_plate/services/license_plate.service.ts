import { Injectable } from "@nestjs/common";
import axios from "axios";
import FormData = require('form-data');
import * as fs from 'fs';

@Injectable()
export class LicensePlateService {
    private apiKey = process.env.PLATE_API_KEY;
    private apiUrl = 'https://api.platerecognizer.com/v1/plate-reader/';

    async recognizeLicensePlate(imageUrl: string): Promise<any> {
        try {
            const response = await axios.post(
                this.apiUrl,
                { upload_url: imageUrl }, // dùng upload_url
                { headers: { Authorization: `Token ${this.apiKey}` } },
            );
            return response.data;
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw new Error('Failed to recognize license plate');
        }
    }

    async recognizeLicensePlateFromFile(filePath: string): Promise<any> {
        try {
            const form = new FormData();
            form.append('upload', fs.createReadStream(filePath));

            const response = await axios.post(this.apiUrl, form, {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Token ${this.apiKey}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw new Error('Failed to recognize license plate');
        }
    }
}