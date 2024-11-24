// Simulated delay to mimic network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Initial mock data
let users = [
  {
    id: 1,
    name: "Faizan",
    email: "faizan@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Harsh",
    email: "Harsh@gmail.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Arpit",
    email: "Arpit@gmail.com",
    role: "Viewer",
    status: "Inactive",
  },
];

let roles = [
  { id: 1, name: "Admin", permissions: ["create", "read", "update", "delete"] },
  { id: 2, name: "Editor", permissions: ["read", "update"] },
  { id: 3, name: "Viewer", permissions: ["read"] },
];

// User CRUD operations
export const userApi = {
  getUsers: async () => {
    await delay(500);
    return [...users];
  },

  createUser: async (user) => {
    await delay(500);
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
    return newUser;
  },

  updateUser: async (user) => {
    await delay(500);
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      return user;
    }
    throw new Error("User not found");
  },

  deleteUser: async (id) => {
    await delay(500);
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    throw new Error("User not found");
  },
};

// Role CRUD operations
export const roleApi = {
  getRoles: async () => {
    await delay(500);
    return [...roles];
  },

  createRole: async (role) => {
    await delay(500);
    const newRole = { ...role, id: roles.length + 1 };
    roles.push(newRole);
    return newRole;
  },

  updateRole: async (role) => {
    await delay(500);
    const index = roles.findIndex((r) => r.id === role.id);
    if (index !== -1) {
      roles[index] = role;
      return role;
    }
    throw new Error("Role not found");
  },

  deleteRole: async (id) => {
    await delay(500);
    const index = roles.findIndex((r) => r.id === id);
    if (index !== -1) {
      roles.splice(index, 1);
      return true;
    }
    throw new Error("Role not found");
  },
};
