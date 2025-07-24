# 📱 TodoApp Mobile (React Native)

This is the mobile client for the **TodoApp** project, built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/). It replicates the full functionality of the Angular web client, including authentication, task management, and statistics.

---

## 🚀 Tech Stack

- **React Native + Expo**
- **Redux Toolkit** for state management
- **React Navigation (Bottom Tabs)**
- **Tailwind CSS** via NativeWind for styling
- **Axios** for API communication
- **AsyncStorage** for token persistence
- **React Hook Form + Yup** for form handling

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── auth/          # Login, register, auth services
│   ├── client/        # Core user features like todo lists
│   ├── core/          # Global services, guards, utils
│   ├── interceptors/  # Axios interceptors (e.g. auth)
│   ├── public/        # Public-facing modules
│   └── shared/        # Shared components, hooks, models
├── App.tsx
├── index.ts
```

---

## 📦 Setup

### ✅ Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

---

### 📥 Installation

```bash
npm install
```

---

### ▶️ Running the App

```bash
npx expo start
```

- Opens Expo DevTools in your browser.
- Run on iOS Simulator, Android Emulator, or physical device using Expo Go.

---

## 🔐 Authentication

- Login and registration via backend auth microservice
- JWT tokens stored securely in AsyncStorage
- Axios interceptor injects tokens in API requests

---

## 🧪 Testing

Testing setup not included by default, but you can add libraries like Jest and React Native Testing Library.

---

## 🛠️ Building for Production

Build and publish your Expo app following [Expo's official guides](https://docs.expo.dev/distribution/building-standalone-apps/).

---

## 📜 License

[MIT](./LICENSE)

---

## 🤝 Contributing

Pull requests are welcome! Please open issues to discuss major features or bugs.
