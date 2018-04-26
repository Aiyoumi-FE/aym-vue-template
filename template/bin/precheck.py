#!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import subprocess
import commands
import os

packageJson = "package.json"
cachePackageJson = ".git/hooks/.versionconfig"
def versiontuple(v):
    return tuple(map(int, (v.split("."))))

def _cmd2(cmd):
    '''window下会报错，改用第二个方法Popen'''
    (status, output) = commands.getstatusoutput(cmd)
    return output

def _cmd(cmd):
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    output, _ = process.communicate()
    return output #(process.returncode, output)

def _run(cmd):
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    while True:
        print process.stdout.readline(),
        if process.poll() != None:
            break

def writeVersion(version):
    file_object = open(cachePackageJson, 'w')
    file_object.write(json.dumps({"version":version}))
    file_object.close()

if __name__ == '__main__':
    json_data = json.load(file(packageJson))
    version = json_data["version"]
    c_version = "0.0.0"

    if not os.path.exists(cachePackageJson):
        writeVersion(version)
    else:
        c_json_data = json.load(file(cachePackageJson))
        c_version = c_json_data["version"]

    if versiontuple(c_version) < versiontuple(version):
        writeVersion(version)
        _run("npm install")

