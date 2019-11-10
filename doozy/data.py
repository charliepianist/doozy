import random
import string
import names
import string
import operator
chars = string.ascii_lowercase + string.digits

max_interest_count = 6
max_issue_questions = 3

def get_all(cursor, table):

    query = "SELECT * FROM {0}".format(table)
    cursor.execute(query)
    records = cursor.fetchall()
    return records

def find_user_email(db, email):

    query = "SELECT email FROM `users` WHERE email = '{0}';".format(email)
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()

    return len(records)

def find_user_id(db, user_id):

    query = "SELECT * FROM `users` WHERE user_id = '{0}';".format(user_id)
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()[0]
    cursor.close()

    return records

def find_user_by_id(db, user_id):

    query = "SELECT * FROM `users` WHERE user_id = '{0}';".format(user_id)
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()[0]
    cursor.close()

    first_name = records[2]
    last_name = records[3]
    return { "firstName": first_name, "lastName": last_name }

def update_db(db, data):

    first_name = data['user']['firstName']
    last_name = data['user']['lastName']
    email = data['user']['email']
    password = data['user']['password']

    found = find_user_email(db, email)

    if found == 0:

        interests = data['interests']
        issues = data['opinions']
        interests_id = []
        for i in interests:
            query = "SELECT interest_id FROM `interests` WHERE interest_name = '{0}';".format(i)
            cursor = db.cursor()
            cursor.execute(query)
            id = cursor.fetchall()[0][0]
            cursor.close()
            interests_id.append(id)

        current_id_length = len(interests_id)
        for i in range(current_id_length, max_interest_count):
            interests_id.append('Default')

        interests_formatted = ', '.join(str(id) for id in interests_id)
        issues_formatted = ', '.join(str(issue_val) for issue_val in issues)

        user_id = insert_user_db(db, email, first_name, last_name, password, interests_formatted, issues_formatted)

        return { "user": { "userId": user_id, "firstName": first_name, "lastName": last_name, "email": email, "password": password}}

    return 1

def insert_user_db(db, email, first_name, last_name, password, interests, issues):

    # insert new user into users table
    user_info = "(DEFAULT, '{0}', '{1}', '{2}', '{3}')".format(email, first_name, last_name, password)
    query = "INSERT INTO `users` VALUES {0};".format(user_info)
    cursor = db.cursor()
    cursor.execute(query)
    cursor.close()

    # insert user interests into users_interests table
    interests_formatted = ', '.join(('LAST_INSERT_ID()', interests))
    query = "INSERT INTO `users_interests` VALUES ({0});".format(interests_formatted)
    cursor = db.cursor()
    cursor.execute(query)
    cursor.close()

    # insert user issues into users_issues table
    issues_formatted = ', '.join(('LAST_INSERT_ID()', issues))
    query = "INSERT INTO `users_issues` VALUES ({0});".format(issues_formatted)
    cursor = db.cursor()
    cursor.execute(query)
    cursor.close()

    # user_id query
    query = "SELECT LAST_INSERT_ID();"
    cursor = db.cursor()
    cursor.execute(query)
    user_id = cursor.fetchall()[0][0]
    cursor.close()

    return user_id

def login_user(db, email, password):

    query = "SELECT email, password FROM `users` WHERE email = '{0}' AND password = '{1}';".format(email, password)
    cursor = db.cursor()
    cursor.execute(query)
    record = cursor.fetchall()
    cursor.close()

    if len(record) == 0:
        return { "result": False }

    query = "SELECT * FROM `users` WHERE email = '{0}' AND password = '{1}';".format(email, password)
    cursor = db.cursor()
    cursor.execute(query)
    record = cursor.fetchall()[0]
    cursor.close()

    user_id = record[0]
    email = record[1]
    first_name = record[2]
    last_name = record[3]
    password = record[4]

    return { "result": True, "user": { "userId": user_id, "firstName": first_name, "lastName": last_name, "email": email, "password": password}}

def insert_user_open(db, user_id):

    query = "SELECT * FROM `open_users` WHERE user_id = '{0}';".format(user_id)
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()

    if len(records) == 0:
        query = "INSERT INTO `open_users` VALUES ({0}, 1);".format(user_id)
        cursor = db.cursor()
        cursor.execute(query)
        cursor.close()

def get_interests_issues(db, table, user_id):

    query = "SELECT * FROM `{0}` WHERE user_id = '{1}';".format(table, user_id)
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()

    records_values = [i for i in records[0][1:] if i]
    return records_values

# def request_chat(db, user_id):

#     sigDiffThreshold = 6

#     query = "SELECT * FROM `open_users` WHERE user_id != '{0}';".format(user_id)
#     cursor = db.cursor()
#     cursor.execute(query)
#     available_to_chat = cursor.fetchall()
#     cursor.close()

#     if len(available_to_chat) == 0:
#         insert_user_open(db, user_id)
#         return { "result": False }

#     caller_id_interests = get_interests_issues(db, 'users_interests', user_id)
#     caller_id_issues = get_interests_issues(db, 'users_issues', user_id)

#     available_user_ids = [available_to_chat[i][0] for i in range(len(available_to_chat))]

#     interest_lists = []
#     issue_lists = []
#     for id in available_user_ids:

#         interest_lists.append(get_interests_issues(db, 'users_interests', id))
#         issue_lists.append(get_interests_issues(db, 'users_issues', id))

#     largest_diff = 0
#     other_id = None
#     shared = None
#     for i in range(len(interest_lists)):
#         shared_interests = set(caller_id_interests) & set(interest_lists[i])
#         shared_interests_count = len(shared_interests)

#         stance_diff = list(map(operator.sub, issue_lists[i], caller_id_issues))
#         stance_diff_total = sum(map(operator.abs, stance_diff))
#         sigDiff = max(abs(max(issue_lists[i]) - min(caller_id_issues)), abs(min(issue_lists[i]) - max(caller_id_issues)))
#         if stance_diff_total > largest_diff and sigDiff > sigDiffThreshold and shared_interests_count >= 1:
#             largest_diff = stance_diff_total
#             shared = list(shared_interests)
#             other_id = available_user_ids[i]

#     if not other_id:
#         insert_user_open(db, user_id);
#         return { "result": False }

#     other_user_info = find_user_id(db, other_id)
#     #print(other_user_info)
#     other_user_id = other_user_info[0]
#     other_email = other_user_info[1]
#     other_first_name = other_user_info[2]
#     other_last_name = other_user_info[3]
#     other_password = other_user_info[4]


#     # remove other_id from open_users
#     query = "DELETE FROM `open_users` WHERE user_id = {0}".format(user_id)
#     cursor = db.cursor()
#     cursor.execute(query)
#     cursor.close()
    
#     shared_interests_names = []
#     for si in shared_interests:
#         query = "SELECT interest_name FROM interests WHERE interest_id = '{0}';".format(str(si))
#         cursor = db.cursor()
#         cursor.execute(query)
#         name_si = cursor.fetchall()[0][0]
#         cursor.close()
#         shared_interests_names.append(name_si)

#     return { "result": True, "user": { "userId": other_user_id, "firstName": other_first_name, "lastName": other_last_name, "email": other_email, "password": other_password}, "sharedInterests": shared_interests_names} 

def request_chat(db, user_id):

    sigDiffThreshold = 6

    query = "SELECT * FROM open_users WHERE user_id != '{0}';".format(user_id)
    cursor = db.cursor()
    cursor.execute(query)
    available_to_chat = cursor.fetchall()
    cursor.close()

    if len(available_to_chat) == 0:
        insert_user_open(db, user_id);
        return { "result": False }

    caller_id_interests = get_interests_issues(db, 'users_interests', user_id)
    caller_id_issues = get_interests_issues(db, 'users_issues', user_id)

    available_user_ids = [available_to_chat[i][0] for i in range(len(available_to_chat))]

    interest_lists = []
    issue_lists = []
    for id in available_user_ids:

        interest_lists.append(get_interests_issues(db, 'users_interests', id))
        issue_lists.append(get_interests_issues(db, 'users_issues', id))

    largest_diff = 0
    other_id = None
    for i in range(len(interest_lists)):
        shared_interests = len(set(caller_id_interests) & set(interest_lists[i]))

        stance_diff = list(map(operator.sub, issue_lists[i], caller_id_issues))
        stance_diff_total = sum(map(operator.abs, stance_diff))
        sigDiff = max(abs(max(issue_lists[i]) - min(caller_id_issues)), abs(min(issue_lists[i]) - max(caller_id_issues)))
        if stance_diff_total > largest_diff and sigDiff > sigDiffThreshold and shared_interests >= 1:
            largest_diff = stance_diff_total
            other_id = available_user_ids[i]

    if not other_id:
        insert_user_open(db, user_id);
        return { "result": False }

    other_user_info = find_user_id(db, other_id)
    other_user_id = other_user_info[0]
    other_email = other_user_info[1]
    other_first_name = other_user_info[2]
    other_last_name = other_user_info[3]
    other_password = other_user_info[4]


    # remove other_id from open_users
    query = "DELETE FROM open_users WHERE user_id = {0}".format(user_id)
    cursor = db.cursor()
    cursor.execute(query)
    cursor.close()

    return { "result": True, "user": { "userId": other_user_id, "firstName": other_first_name, "lastName": other_last_name, "email": other_email, "password": other_password}}

def generate_users(db, table, user_count):

    # get all possible interest_ids
    query = "SELECT interest_id FROM `interests`;"
    cursor = db.cursor()
    cursor.execute(query)
    all_interest_ids = cursor.fetchall()
    cursor.close()

    all_interest_ids_formatted = [all_interest_ids[i][0] for i in range(len(all_interest_ids))]
    interest_ids = set(all_interest_ids_formatted)
    issue_scores = [i for i in range(0,11)]
    genders = ['female','male']
    i = 0
    while i < user_count:

        g = random.choice(genders)
        first_name = names.get_first_name(gender=g)
        last_name = names.get_last_name()
        password = ''.join(random.sample(chars,10))
        username = ''.join((first_name[0], last_name, str(random.randint(100, 999))))
        email = ''.join((username, '@princeton.edu'))

        found = find_user_email(db, email)

        if found == 0:

            interests = random.sample(interest_ids, max_interest_count)
            issues = random.sample(issue_scores, max_issue_questions)

            interests_formatted = ', '.join(str(id) for id in interests)
            issues_formatted = ', '.join(str(issue_val) for issue_val in issues)

            insert_user_db(db, email, first_name, last_name, password, interests_formatted, issues_formatted)

            # query = "INSERT INTO open_users VALUES (LAST_INSERT_ID(), 1);"
            # cursor = db.cursor()
            # cursor.execute(query)
            # cursor.close()
            i += 1
