const fs = require("fs");

module.exports = {
config: {
		name: "bank",
		version: "1.9",
		author: "loufi | fixed by mero,ohio",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "virtual bank system"
		},
		longDescription: {
			vi: "",
			en: "virtual bank system"
		},
		category: "banking",
		guide: {
			vi: "",
			en: "{pn} Deposit\n{pn} Withdraw\n{pn} Balance\n{pn} Interest\n{pn} richest\n{pn} loan\n{pn} payloan"
		}
},

  onStart: async function ({ args, message, event, usersData }) {
    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const bankData = JSON.parse(fs.readFileSync("bank.json", "utf8"));

    if (!bankData[user]) {
       bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
    }
 const command = args[0];
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);

if (command === "richest") {
  const topTen = Object.entries(bankData).sort((a, b) => b[1].bank - a[1].bank).slice(0, 25);
  const messageText = "Richest people in the 𝘽𝙖𝙣𝙠 𝘽𝙤𝙩 𝙨𝙮𝙨𝙩𝙚𝙢👑🤴:\n\n" +
    (await Promise.all(
      topTen.map(async ([userID, data], index) => {
        const userData = await usersData.get(userID);
        return `[${index + 1}. ${userData.name}:\n${data.bank}$ ]`;
      })
    )).join("\n\n");
  return message.reply(messageText);
}
    if (command === "deposit") {
      if (isNaN(amount) || amount <= 0) {
        return message.reply("[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏Please enter a valid amount...🌝🔁•");
      }
      if (userMoney < amount) {
        return message.reply("[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏You don't have the required amount...😈•");
      }

      bankData[user].bank += amount;
      await usersData.set(event.senderID, {
        money: userMoney - amount
      });

      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
      return message.reply(`[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢\n\n❏Successfully deposited ${amount} $ into your bank account✅✨•`);
    } else if (command === "withdraw") {
      const balance = bankData[user].bank || 0;

      if (isNaN(amount) || amount <= 0) {
        return message.reply("[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏bandit please enter the correct amount...👩‍🚒");
      }
      if (amount > balance) {
        return message.reply("[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏The requested amount is greater than the available balance in your bank account...🌝");
      }
      bankData[user].bank = balance - amount;
      const userMoney = await usersData.get(event.senderID, "money");
      await usersData.set(event.senderID, {
        money: userMoney + amount
   });
       fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;

      });
      return message.reply(`[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏Successfully withdrew ${amount}$ from your bank account ✅✨•`);

    } else if (command === "balance") {

      const balance = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank :0;

  return message.reply(`[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏ Your bank balance is: ${balance} $•\n❏ To withdraw money.\ntype:\n/bank Withdraw 'your withdrawal amount'•\n❏To earn interest\ntype:\n/bank interest•`);

} else if (command === "interest") {

  const interestRate = 0.0004; 

  const lastInterestClaimed = bankData[user].lastInterestClaimed || Date.now();

  const currentTime = Date.now();

  const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;
 

  const interestEarned = bankData[user].bank * (interestRate / 365) * timeDiffInSeconds;


bankData[user].lastInterestClaimed = currentTime;

  bankData[user].bank += interestEarned;



  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {

    if (err) throw err;

  });
  return message.reply(`[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏🌚...You have earned interest of ${interestEarned.toFixed(2)} $ . It has been successfully added to your account balance..✅•`);
        } else if (command === "transfer") {
  const balance = bankData[user].bank || 0;
  if (isNaN(amount) || amount <= 0) {
    return message.reply("[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 👿🏢]\n\n❏Please enter the amount you want to transfer...🌝");
  }
  if (balance < amount) {
    return message.reply("[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏The amount is not available in your bank account•.....👿");
  }
  if (isNaN(recipientUID)) {
    return message.reply("[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏Please enter the correct recipient ID.....🌝");
  }
  if (!bankData[recipientUID]) {
    bankData[recipientUID] = { bank: 0, lastInterestClaimed: Date.now() };
    fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
      if (err) throw err;
    });
  }
  bankData[user].bank -= amount;
  bankData[recipientUID].bank += amount;
  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
    if (err) throw err;
  });
  return message.reply(`[🏢😈 𝘽𝙖𝙣𝙠 𝙎𝙮𝙨𝙩𝙚𝙢 😈🏢]\n\n❏Successfully deducted ${amount} from your account and transferred it to ${recipientUID} ✅✨•`);
    } else if (command === "loan") {
 if (isNaN(amount) || amount <= 0) {
 return message.reply("Please enter the amount you wish to borrow.");
 }
 if (bankData[user].loan > 0) {
 return message.reply("You already have an existing loan.");
 }
 if (amount > 5000) {
 return message.reply("The maximum loan amount is 5000.");
 }
 bankData[user].loan = amount;
 bankData[user].loanDueDate = Date.now() + 7 * 24 * 60 * 60 * 1000; // due date after 1 week
 bankData[user].bank += amount;
 await usersData.set(event.senderID, {
 money: userMoney + amount
 });
 fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
 if (err) throw err;
 });
 return message.reply(`You have borrowed ${amount} $. The loan amount will be deducted from your bank account balance after 1 week.`);
} else if (command === "payloan") {
 const loan = bankData[user].loan || 0;
 const loanDueDate = bankData[user].loanDueDate || 0;

 if (loan <= 0 || loanDueDate <= 0) {
 return message.reply("You don't have an existing loan.");
 }
 const daysLate = Math.ceil((Date.now() - loanDueDate) / (24 * 60 * 60 * 1000));
 const interestRate = 0.0001; // 0.01% per day
 const interest = loan * interestRate * daysLate;
 const totalAmountDue = loan + interest;


 if (isNaN(amount) || amount <= 0) {
 return message.reply(`Please enter the amount you wish to pay. The total amount due is ${totalAmountDue} $.`);
 }
 if (amount > userMoney) {
 return message.reply("You don't have enough money to pay the loan.");
 }
 if (amount < totalAmountDue) {
 return message.reply(`The amount you entered is less than the total amount due (${totalAmountDue} $). Please pay the full amount.`);
 }
 bankData[user].loan = 0;
 bankData[user].loanDueDate = 0;
 bankData[user].bank -= loan;
 await usersData.set(event.senderID, {
 money: userMoney - amount
 });
 fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
 if (err) throw err;
 });
 return message.reply(`You have paid your loan of ${loan} $ plus interest of ${interest.toFixed(2)} $. The total amount paid is ${totalAmountDue} $.`);
} else {
 return message.reply("|==[🏢😈 𝘽𝙖𝙣𝙠 𝙨𝙮𝙨𝙩𝙚𝙢𝙚 𝘽𝙤𝙩 😈🏢]==|\n\n❏Please use one of the following\ncommands:\n⭔ 💕🃏+Bank Deposit🃏💕\n⭔ 💕🃏Bank Withdraw🃏💕\n⭔ 💕🃏+Bank balance🃏💕\n⭔ 💕🃏+Bank Interest🃏💕\n⭔ 💕🃏+Bank Transfer🃏💕\n⭔ 💕🃏+Bank richest🃏💕\n⭔ 💕🃏+Bank Loan🃏💕\n⭔ 💕🃏+Bank PayLoan🃏💕");
} 
}
}
