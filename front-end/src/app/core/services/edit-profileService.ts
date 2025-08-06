// Updated Service (edit-profileService.ts)
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface EditUserProfile {
    id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profilePicUrl: string;
}

export interface getProfile{
    id: string,
    fname: string,
    lname: string,
    email: string,
    profilePicUrl: string
}

@Injectable({ providedIn: 'root' })
export class EditUserProfileService {
    private baseAPI = 'https://localhost:7279/api/User';
    private updateAPI = `${this.baseAPI}/UpdateProfile`;
    private deleteAPI = `${this.baseAPI}/DeleteProfile`;
    private getProfileAPI = `${this.baseAPI}/Profile`;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}
    
    /**
     * Get user profile by ID
     */
    getProfile(userId: string): Observable<getProfile> {
        console.log('Service - Getting profile for user:', userId);
        console.log('Service - GET API URL:', `${this.getProfileAPI}/${userId}`);
        
        return this.http.get<getProfile>(`${this.getProfileAPI}/${userId}`, this.httpOptions);
    }

    /**
     * Update user profile
     */
    updateProfile(userProfile: EditUserProfile): Observable<any> {
        return this.http.put(this.updateAPI, userProfile, { 
            ...this.httpOptions,
            responseType: 'text' 
        });
    }

    /**
     * Delete user profile
     */
    deleteProfile(userId: string): Observable<any> {
        // Option 1: Send userId in request body
        return this.http.delete(this.deleteAPI, {
            ...this.httpOptions,
            body: { id: userId },
            responseType: 'text'
        });
    }
}