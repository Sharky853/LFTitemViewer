
module.exports = {
    name: "Not yet implemented",
    id: "notYetImplemented",
    async execute(interaction, bot) {
        console.log(`Someone try to use unfinish button`);
		await interaction.reply({
			content: `This is an unfinished button,\nthe code behind it is not yet implemented`,
			fetchreply: true,
			ephemeral: true,
    })
}};