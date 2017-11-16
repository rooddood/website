import json
import urllib.request
import requests
import datetime
import os
import threading
import cv2
import numpy
import imageio

from bs4 import BeautifulSoup
from urllib.parse import urlparse
from cv2 import VideoWriter, VideoWriter_fourcc, imread, resize


class URLExtractor(object):

    def __init__(self, url):
        self.url = url

    def get_status_code(self, url):
        try:
            r = requests.get(url, timeout=10.0)
            return r.status_code
        except requests.Timeout as err:
            pass
        except requests.exceptions.ConnectionError:
            pass

    def url_extractor(self):

        threading.Timer(900.0, self.url_extractor).start()

        html_page = urllib.request.urlopen(self.url)
        soup = BeautifulSoup(html_page, 'html.parser')
        json_dict = json.loads(str(soup))

        url_list = []
        print("Extracting URLS...")
        for entry in json_dict['results']:
            url_list.append(entry['url'][entry['url'].find('http'):])

        print("URLS extracted.")

        # opener = urllib.request.URLopener()

        working_urls = []

        print("Checking status code of website...")
        for index, value in enumerate(url_list):
            if(self.get_status_code(value) == 200):

                print("Site #%d works" % (index))
                working_urls.append(value)

        print("Added %d working urls to list" % (len(working_urls)))

        working_urls.sort()

        return working_urls

    def data_dir(self):

        headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                   'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                   'Accept-Encoding': 'none',
                   'Accept-Language': 'en-US,en;q=0.8',
                   'Connection': 'keep-alive'}

        url_list = self.url_extractor()

        dt = str(datetime.datetime.now())
        dt = '_'.join(dt.split())

        website_list = []
        resource_address = []

        os.makedirs('images', exist_ok=True)

        for index, val in enumerate(url_list):

            try:

                print('Adding %s to file#%d...' % (val, index + 1))
                filename = '%s' % (val)
                os.makedirs('images/%d' % (index + 1), exist_ok=True)

                # urlparse(val).netlocc
                myrequest = urllib.request.Request(val, None, headers)
                response = urllib.request.urlopen(myrequest)
                f = open('images/%d/%s.jpg' % (index + 1, dt), 'wb')
                f.write(response.read())
                f.close()

            except urllib.error.HTTPError as err:
                pass

        print('Added images to each respective directory tree.')

    def video_dir(self):

        threading.Timer(86400.0, self.video_dir).start()

        list_of_images = []

        rootDir = 'images/'
        for dirpath, dirnames, files in os.walk(rootDir, topdown=True):

            dirnames.sort(key=int)

            list_of_images.append(files)

        for i in range(1, len(list_of_images), 1):

            images_in_folder = []

            os.makedirs('videos/%d' % (i), exist_ok=True)

            for j in range(len(list_of_images[i])):

                print(list_of_images[i][j])

                file_path = os.path.join('images/%d' %
                                         (i), list_of_images[i][j])

                images_in_folder.append(imageio.imread(file_path))

            imageio.mimsave('videos/%d/movie%d.mp4' % (i, i), images_in_folder)


url = "http://amos.cse.wustl.edu/REST/webcams/"
myobj = URLExtractor(url)


myobj.data_dir()

# myobj.video_dir()
