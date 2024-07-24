module.exports = {
    cust_select:'SELECT * FROM cust',
    cust_select_one:'SELECT * FROM cust WHERE id = ?',
    cust_insert:'INSERT INTO cust VALUES (?,?,?,?)',
    cust_update:'UPDATE cust SET pwd=?, name=?, acc=? WHERE id=?',
    cust_delete:'DELETE FROM cust WHERE id = ?',

    item_select: 'SELECT id,name,price, imgname, date_format(regdate, "%Y-%m-%d, %H:%i:%s") as regdate FROM item',
    item_select_one: 'SELECT * FROM item WHERE id = ?',
    item_insert: 'INSERT INTO item VALUES (0, ?,?,?, SYSDATE())',
    item_update: 'UPDATE item SET name=?, price=?, imgname=? WHERE id=?',
    item_delete: 'DELETE FROM item WHERE id=?'
}