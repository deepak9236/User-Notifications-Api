# User Notification Preferences API 🔔

## 🔗 Links

- **Backend API**: [https://user-notifications-api.vercel.app](https://user-notifications-api.vercel.app)
- **Swagger Documentation**: [https://user-notifications-api.vercel.app/docs](https://user-notifications-api.vercel.app/docs)
- **GitHub Repository**: [https://github.com/deepak9236/User-Notifications-Api.git](https://github.com/deepak9236/User-Notifications-Api.git)

![App Screenshot](https://github.com/deepak9236/User-Notifications-Api/blob/master/swagger.png)

### Available Endpoints:

1. **User Preferences**
   - `POST /api/preferences` - Create user preferences
   - `GET /api/preferences/{userId}` - Get user preferences
   - `PATCH /api/preferences/{userId}` - Update user preferences
   - `DELETE /api/preferences/{userId}` - Delete user preferences

2. **Notifications**
   - `POST /api/notifications/send` - Send a notification
   - `GET /api/notifications/{userId}/logs` - Get notification logs
   - `GET /api/notifications/stats` - Get notification statistics

For detailed request/response examples, please refer to the Postman collection above.

## ✨ Features

- Manage user preferences for notifications
- Notification delivery simulation
- MongoDB integration
- Fully serverless (deployable on Vercel)
- API validation with class-validator
- Swagger API documentation

## 🛠️ Tech Stack

- **Backend**: NestJS, TypeScript
- **Database**: MongoDB
- **Testing**: Jest (unit & integration tests)
- **Deployment**: Vercel

## 📋 Prerequisites

Ensure you have the following installed:

- Node.js (v16 or above)
- MongoDB (local or cloud)
- Vercel CLI (for Vercel deployment)

## 🚀 Setup

### 1. Clone the repository

```bash
git clone https://github.com/deepak9236/User-Notifications-Api.git
cd User-Notifications-Api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URI=mongodb+srv://<username>:<db_password>@cluster0.c9iec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
LOG_LEVEL=debug
```

### 4. Run the application

```bash
npm run start:dev
```

The API will be available at: `http://localhost:5000`

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run Integration Tests

```bash
npm run test:e2e
```

## 📦 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy to Vercel:
```bash
vercel
```

4. Set Environment Variables on Vercel:
   - Add your `MONGO_URI` variable in the Vercel dashboard under Project Settings > Environment Variables

## 📝 API Endpoints & Postman Collection

Import the following collection into Postman to explore and test all API endpoints:

```json
{
  "info": {
    "_postman_id": "d595f969-3f53-4d5d-bb1f-1adafaef58f6",
    "name": "User Notifications Api",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Send a Notification",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"userId\": \"user123\",\n  \"type\": \"marketing\",\n  \"channel\": \"email\",\n  \"content\": {\n    \"subject\": \"Special Offer\",\n    \"body\": \"Check out our latest deals!\"\n  }\n}\n",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:5000/api/notifications/send",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "notifications", "send"]
        }
      }
    },
    {
      "name": "Create User Preferences",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"userId\": \"user123\",\n  \"email\": \"user@example.com\",\n  \"preferences\": {\n    \"marketing\": true,\n    \"newsletter\": false,\n    \"updates\": true,\n    \"frequency\": \"weekly\",\n    \"channels\": {\n      \"email\": true,\n      \"sms\": false,\n      \"push\": true\n    }\n  },\n  \"timezone\": \"America/New_York\"\n}\n",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:5000/api/preferences",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "preferences"]
        }
      }
    },
    {
      "name": "Get User Preferences",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/preferences/user123",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "preferences", "user123"]
        }
      }
    },
    {
      "name": "Get Notification Logs",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/notifications/user123/logs",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "notifications", "user123", "logs"]
        }
      }
    },
    {
      "name": "Get Notification Stats",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/notifications/stats",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "notifications", "stats"]
        }
      }
    }
  ]
}
```


