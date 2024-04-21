module.exports = async (client, interaction) => {
    // Ignore interactions from bots
    if (interaction.isCommand() && interaction.user.bot) return;

    // Handle slash command interactions
    if (interaction.isCommand()) {
        // Retrieve the command name and data
        const command = client.commands.get(interaction.commandName);
        
        // Check if the command exists
        if (!command) return;
        
        // Execute the command
        try {
            await command.execute(interaction);
            console.log('working')
        } catch (error) {
            console.error(`Error executing command: ${error}`);
            await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
    }
};
