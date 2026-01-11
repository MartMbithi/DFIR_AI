import mysql.connector

def test_mysql_connection():
    """
    Test that a connection to the MySQL database can be established.
    """
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="dfir_ai"
    )

    assert connection.is_connected() is True

    cursor = connection.cursor()
    cursor.execute("SELECT DATABASE();")
    result = cursor.fetchone()

    assert result[0] == "dfir_ai"

    cursor.close()
    connection.close()
