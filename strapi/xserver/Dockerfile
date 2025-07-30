# Use the official Python image from the Docker Hub
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# 
RUN apt update && apt install -y dcmtk libgl1-mesa-glx

# Install any necessary dependencies
RUN pip install --no-cache-dir fastapi uvicorn[standard] redis starlette itsdangerous \
 pillow pydicom opencv-python-headless

# Expose the port the app runs on
EXPOSE 8000

# Define the command to start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]