let dataUsers = [
    {
      id : 0 ,
      pseudo: "jeanLucRichman",
      date_entree: new Date("2006-09-24"),
      mot_de_passe: "jdedded",
    },
    {
      id : 1,
      pseudo: "alberZweiTime",
      date_entree: new Date("2006-09-24"),
      mot_de_passe: "jdedded",
    },
    {
      id:2,
      pseudo: "leonardoDicarpacio",
      date_entree: new Date("2006-09-24"),
      mot_de_passe: "jdedded",
    },
    {
      id:3,
      pseudo: "elgroundo",
      date_entree: new Date("2006-09-24"),
      mot_de_passe: "jdedded",
    },
    {
      id:4,
      pseudo: "McMC",
      date_entree: new Date("2006-09-24"),
      mot_de_passe: "jdedded",
    },
    {
      id:5,
      pseudo: "SaladTomate",
      date_entree: new Date("2006-09-24"),
      mot_de_passe: "jdedded",
    },
    {
      id:6,
      pseudo: "HMMMMMMMM",
      date_entree: new Date("2006-09-24"),
      mot_de_passe: "jdedded",
    },
  ];

  const getUser = (userID) => {
    return dataUsers.find((user) => user.id == userID);
  }

  const removeUser = (userID) => {
    dataUsers = dataUsers.filter((user) => user.id != userID);
  }
//
  const updateUser = (userID, updatedUser) => {
    dataUsers = dataUsers.map((user) =>
    user.id == userID ? updatedUser : user
    );
 };

 export {dataUsers,getUser, removeUser, updateUser};