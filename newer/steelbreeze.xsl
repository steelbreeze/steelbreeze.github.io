<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" encoding="utf-8"/>
	<xsl:template match="/page">
		<html>
			<head>
				<title><xsl:value-of select="@title"/></title>
			</head>
			<body>
				<header>
					<h1><xsl:value-of select="@title"/></h1>
				</header>

				Main
				<footer>
					Footer
				</footer>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>