
import ApiResponse from "../../lib/api/response.api";
import asyncHandler from "../../lib/async/express.async";
import { Request, Response } from "express";
import axios, { options } from 'axios'
import { google } from 'googleapis';
import { analyzePhishingContent } from "../services/scamLinkDetection.service";

import {GoogleSafeBrowsingClient} from "google-safe-browsing";
import { TextPhishingDetector } from "../services/scamTextDetection.service";
import { AudioPhishingDetector } from "../services/scamAudioDetection.service";


const safebrowsing = google.safebrowsing('v4')



const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY!
const safebrowsingClient = new GoogleSafeBrowsingClient(API_KEY)

const url = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`; 


const textDetector = new TextPhishingDetector(process.env.OPENAI_API_KEY!, "gpt-4", 0.2)
const audioDetector = new AudioPhishingDetector(process.env.OPENAI_API_KEY!, "gpt-4", 0.2)

export const linkDetection = asyncHandler(async(req:Request, res:Response)=>{
    const {link} = req.body;

    if(!link){
        return res.status(400).json(new ApiResponse(400,"Link is required"))
    }
    console.log("Link",link)
    const response = await analyzePhishingContent(link);
    console.log("Response",response)
    return res.status(200).json(new ApiResponse(200, "Link detected", JSON.stringify(response)))
})

export const textDetection = asyncHandler(async(req:Request,res:Response)=>{
    const {text} = req.body;
    console.log("Text",text)

    if(!text){
        return res.status(400).json(new ApiResponse(400, "Text is required"))
    }
    const response = await textDetector.analyzeMessage(text)
    console.log("Response",response);

    return res.status(200).json(new ApiResponse(200, "Text detected", JSON.stringify(response)))
})



export const audioDetection = asyncHandler(async(req:Request,res:Response)=>{
    
  const audioFilePath = req.file?.path;
  if(!audioFilePath) {
    return res.status(400).json(new ApiResponse(400, "Audio file is required"))
  }

  const response  = await audioDetector.analyzeAudio(audioFilePath)
  console.log("Response",response)

    return res.status(200).json(new ApiResponse(200, "Audio detected", JSON.stringify(response)))
})

export const audioDetectionQuick = asyncHandler(async(req:Request,res:Response)=>{
    const audioFilePath = req.file?.path;
    if(!audioFilePath) {
        return res.status(400).json(new ApiResponse(400, "Audio file is required"))
    }
    const response  = await audioDetector.quickCheck(audioFilePath)
    console.log("Response",response)

    return res.status(200).json(new ApiResponse(200, "Audio detected", JSON.stringify(response)))
})

