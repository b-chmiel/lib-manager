import requests
import sys
import json
import random
import string

ADDRESS = "http://lib-manager-io.herokuapp.com/api/book/add"


def getBook():
    data = {}
    data["bookId"] = 0
    data["authorName"] = random_string()
    data["bookTitle"] = random_string()
    data["description"] = random_string()
    data["language"] = "0"
    data["publicationDate"] = "2021-05-15T15:57:01.614Z"
    data["pageCount"] = random.randint(1, 200)
    data["bookCount"] = random.randint(1, 200)

    return data


def random_string(length=10):
    return "".join(random.choice(string.ascii_lowercase) for i in range(length))


def post(n=10):
    for i in range(n):
        res = requests.post(
            ADDRESS,
            headers={"Content-Type": "application/json"},
            data=json.dumps(getBook()),
        )
        print(res.content)


if __name__ == "__main__":
    n = 10
    if len(sys.argv) == 2:
        n = int(sys.argv[1])

    post(n)
