# 🌐 ConnectUp

> A digital hub where communities can **discover, share, and connect** around local events, activities, and opportunities.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?logo=radix-ui)
![Framer Motion](https://img.shields.io/badge/FramerMotion-Animations-ff69b4?logo=framer)

---

## ✨ Overview

**ConnectUp** is a simple but powerful web application designed around the theme of **Connection**.  
It helps people **discover events, meet new friends, and strengthen communities** by providing a modern, accessible event noticeboard.

This project is built as part of the **CodeSpace x KPN “Connection” Pitch Challenge 2025**.

---

## 🚀 Features

- 📌 **Event Listings** – Browse upcoming community events.  
- 🔍 **Search & Filters** – Quickly find events by category or date.  
- 📝 **Create Events** – Organisers can easily post new events.  
- 🙋 **RSVP** – Users can mark themselves as "Interested" or "Going".  
- 🌙 **Light/Dark Mode** – Fully themeable with shadcn/ui tokens.  
- 📱 **Responsive Design** – Optimised for desktop and mobile.  
- ⚡ **Smooth Animations** – Framer Motion transitions for a modern feel.  

---

## 📖 User Stories

See [userStories.md](./userStories.md) for the full list.  

Key MVP user stories include:

- [ ] As a **user**, I want to browse a list of upcoming events so that I can discover activities in my community.  
- [ ] As an **event organiser**, I want to create a new event so that others can discover and join it.  
- [ ] As a **user**, I want to mark myself as "Interested" or "Going" so that I can plan my participation.  

---

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** – React framework for fast, scalable web apps  
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first styling  
- **[shadcn/ui](https://ui.shadcn.com/)** – Accessible component system with theme tokens  
- **[Framer Motion](https://www.framer.com/motion/)** – Declarative animations  
- **[TypeScript](https://www.typescriptlang.org/)** – Strongly typed development  
- **[Firebase](https://www.firebase-console/)** – Strongly typed development  

---

## 📂 Project Structure


```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 .next/ 🚫 (auto-hidden)
├── 📁 app/
│   ├── 📁 about/
│   │   └── 📄 page.tsx
│   ├── 📁 create-event/
│   │   └── 📄 page.tsx
│   ├── 📁 events/
│   │   └── 📄 page.tsx
│   ├── 🖼️ favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 components/
│   ├── 📁 ui/
│   │   ├── 📄 button.tsx
│   │   └── 📄 dropdown-menu.tsx
│   ├── 📄 Header.tsx
│   ├── 📄 mode-toggle.tsx
│   └── 📄 theme-provider.tsx
├── 📁 lib/
│   └── 📄 utils.ts
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 public/
│   ├── 🖼️ logo.png
│  
├── 🚫 .gitignore
├── 📖 README.md
├── 📄 components.json
├── 📄 eslint.config.mjs
├── 📄 next-env.d.ts 🚫 (auto-hidden)
├── 📄 next.config.ts
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 postcss.config.mjs
└── 📄 tsconfig.json
```

---


---

## 🎨 UI & Branding

- **Name:** ConnectUp  
- **Theme:** *Bringing communities closer together through events and activities*  
- **Logo:** 📍 A map pin combined with a chat bubble (represents location + conversation)  
- **Colors:**  
  - Purple → Creativity & community  
  - Orange → Energy & vibrance  

---

## 🏗️ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/NelsonMALGAS/connectup.git
cd connectup
npm install
```


# ✅ ConnectUp – User Stories

## 🏠 General
- [ ] As a **visitor**, I want to see a welcoming landing page so that I understand what ConnectUp is about.
- [x] As a **user**, I want to switch between light and dark mode so that I can view the app in my preferred theme.

---

## 📅 Events
- [ ] As a **user**, I want to browse a list of upcoming events so that I can discover activities in my community.
- [ ] As a **user**, I want to filter or search for events by category/date so that I can quickly find relevant activities.
- [ ] As a **user**, I want to view details of a single event (title, description, date, time, location) so that I can decide whether to attend.
- [ ] As a **user**, I want to mark myself as "Interested" or "Going" to an event so that I can plan my participation.
- [ ] As an **event organiser**, I want to create a new event so that others can discover and join it.
- [ ] As an **event organiser**, I want to edit or delete my event so that I can keep details accurate.

---

## 👤 Accounts (Future Scope / Optional MVP)
- [ ] As a **user**, I want to create an account so that I can manage my events and RSVPs.
- [ ] As a **user**, I want to log in with email/social accounts so that I can access my profile easily.
- [ ] As a **user**, I want to manage my profile (name, avatar, bio) so that others know who I am when I create events.

---

## 🔔 Notifications (Stretch Goals)
- [ ] As a **user**, I want to receive a notification/reminder before an event I marked as "Going" so that I don’t miss it.
- [ ] As an **event organiser**, I want to notify attendees if event details change so that they stay informed.

---

## 📱 Mobile Experience
- [ ] As a **user**, I want the app to be mobile-friendly so that I can browse and join events easily on my phone.
- [ ] As a **user**, I want a responsive navigation menu (hamburger) so that I can navigate easily on small screens.
