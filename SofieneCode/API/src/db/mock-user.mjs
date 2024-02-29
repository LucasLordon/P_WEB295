let dataUsers = [
    {
      id : 0 ,
      pseudo: "jeanLucRichman",
      date_entree: new Date("01-04-2006"),
      mot_de_passe: "jdedded",
    },
    {
      id : 1,
      pseudo: "alberZweiTime",
      date_entree: new Date("06-03-2006"),
      mot_de_passe: "jdedded",
    },
    {
      id:2,
      pseudo: "leonardoDicarpacio",
      date_entree: new Date("10-03-2006"),
      mot_de_passe: "jdedded",
    },
    {
      id:3,
      pseudo: "elgroundo",
      date_entree: new Date("01-02-2006"),
      mot_de_passe: "jdedded",
    },
    {
      id:4,
      pseudo: "McMC",
      date_entree: new Date("01-03-2010"),
      mot_de_passe: "jdedded",
    },
    {
      id:5,
      pseudo: "SaladTomate",
      date_entree: new Date("20-02-2008"),
      mot_de_passe: "jdedded",
    },
    {
      id:6,
      pseudo: "HMMMMMMMM",
      date_entree: new Date("01-03-2006"),
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