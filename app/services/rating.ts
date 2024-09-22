import { api } from "./api";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export interface Rating {
  id: number;
  rating: number;
  owner: number;
  user: number;
}

export interface RatingCreate {
  rating: number;
  owner: number;
  user: number;
}

export class RatingService {
    private axiosClient = api;
    private baseUrl = "/api/ratings/";
    private authToken: string | null = null;
  
    constructor(authToken: string | null) {
      this.authToken = authToken;
    }
  
    
    async getAverageRating(userId: number) {
      const url = `${this.baseUrl}${userId}/average-rating/`;
      try {
        const response = await this.axiosClient.get(url, {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        });
        return response.data;
      } catch (error: any) {
        console.log("Error getting average rating", error);
        return error.response;
      }
    }

    async createRating(data: RatingCreate) {
        try {
        const response = await this.axiosClient.post(this.baseUrl, data, {
            headers: {
            Authorization: `Bearer ${this.authToken}`,
            },
        });
        return response;
        } catch (error: any) {
        console.error("Error creating rating", error);
        return error.response;
        }
    }

    async getRating(id: number) {
        const url = `${this.baseUrl}${id}/`;
        try {
        const response = await this.axiosClient.get(url, {
            headers: {
            Authorization: `Bearer ${this.authToken}`,
            },
        });
        return response;
        } catch (error: any) {
        console.log("Error getting rating", error);
        return error.response;
        }
    }

    async getRatings() {
        try {
        const response = await this.axiosClient.get(this.baseUrl, {
            headers: {
            Authorization: `Bearer ${this.authToken}`,
            },
        });
        return response;
        } catch (error: any) {
        console.log("Error getting ratings", error);
        return error.response;
        }
    }
}

export const useRatingService = () => {
  const { userToken } = useContext(AuthContext);

  return new RatingService(userToken);
};
