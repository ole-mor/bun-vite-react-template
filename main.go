package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type ApiResponse struct {
	Message string `json:"message,omitempty"`
	Error   string `json:"error,omitempty"`
	Success bool   `json:"success,omitempty"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	var allowedOrigin string
	if os.Getenv("NODE_ENV") == "production" {
		allowedOrigin = "*" // Or your specific production origin
	} else {
		allowedOrigin = "http://localhost:5173"
	}

	staticFilesDir := "./dist"
	absStaticFilesDir, _ := filepath.Abs(staticFilesDir)

	fmt.Printf("Serving static files from: %s\n", absStaticFilesDir)
	fmt.Printf("Backend server starting on port %s...\n", port)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			handleCORS(w, r, allowedOrigin)
			return
		}

		if strings.HasPrefix(r.URL.Path, "/api/") {
			handleAPI(w, r, allowedOrigin)
			return
		}

		http.NotFound(w, r)
	})

	fmt.Printf("Backend server listening on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func handleCORS(w http.ResponseWriter, r *http.Request, allowedOrigin string) {
	w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Max-Age", "86400")
	w.WriteHeader(http.StatusNoContent)
}

func handleAPI(w http.ResponseWriter, r *http.Request, allowedOrigin string) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)

	var responseBody ApiResponse
	var responseStatus int = http.StatusNotFound

	if r.URL.Path == "/api/ping" && r.Method == "GET" {
		responseBody = ApiResponse{Message: "yo"}
		responseStatus = http.StatusOK
		fmt.Printf("yo")
	} else {
		responseBody = ApiResponse{Error: "API Not Found"}
	}

	w.WriteHeader(responseStatus)
	json.NewEncoder(w).Encode(responseBody)
}
