export enum Theme {
    Light = "light",
    Dark = "dark",
    Cupcake = "cupcake",
    Bumblebee = "bumblebee",
    Emerald = "emerald",
    Corporate = "corporate",
    Synthwave = "synthwave",
    Retro = "retro",
    Cyberpunk = "cyberpunk",
    Valentine = "valentine",
    Halloween = "halloween",
    Garden = "garden",
    Forest = "forest",
    Aqua = "aqua",
    Lofi = "lofi",
    Pastel = "pastel",
    Fantasy = "fantasy",
    Wireframe = "wireframe",
    Black = "black",
    Luxury = "luxury",
    Dracula = "dracula",
    Cmyk = "cmyk",
    Autumn = "autumn",
    Business = "business",
    Acid = "acid",
    Lemonade = "lemonade",
    Night = "night",
    Coffee = "coffee",
    Winter = "winter",
    Dim = "dim",
    Nord = "nord",
    Sunset = "sunset",
  }


  export interface IMessage {
    senderId: string;  // Mongo ObjectId will be a string in the frontend (assuming you're using string representation)
    receiverId: string;
    text?: string;
    image?: string;
    createdAt: string;  // ISO 8601 format date string, since frontend usually deals with date as a string
    _id:string
}

export interface IUser {
    fullname: string;
    email: string;
    password: string;
    isActive: boolean;
    profilePic: string;
    createdAt: string;  // ISO 8601 date string
    updatedAt: string;  // ISO 8601 date string
    _id:string
}

  
  export default Theme;
  