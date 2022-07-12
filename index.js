const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
    client.on("message", (message) => {
      if (message.content == `!collect`) {
        // Create a message collector
        const filter = (m) =>
          m.content.includes("discord") && m.author.id != client.user.id;
        const channel = message.channel;
        const collector = channel.createMessageCollector(filter, {
          time: 10000,
        });
        console.log("collector started");
        collector.on("collect", (m) => console.log(`Collected ${m.content}`));
        collector.on("end", (collected) =>
          console.log(`Collected ${collected.size} items`)
        );
      }
    });
  }
});

client.login(token);
