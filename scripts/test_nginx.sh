#!/bin/bash

export ENV=test

pass=0
fail=0
fail_report=()

fail() {
    >&2 echo -e "\e[41m[fail]\e[49m \e[91m$1\e[39m"
    ((fail++))
    fail_report+=("$1")
}

pass() {
    echo -e "\e[42m[pass]\e[49m $1"
    ((pass++))
}

title() {
    echo
    echo -e "\e[44m$1\e[49m"
}

totals() {
    title "Results"
    echo -e "\e[42m[Total Passing]\e[49m $pass"
    if [[ $fail -gt 0 ]]; then
        echo -e "\e[41m[Total Failing]\e[49m $fail"
        echo
        for msg in "${fail_report[@]}"; do
            echo -e "\e[41m$msg\e[49m"
        done
        exit 1
    else
        echo -e "[Total Failing] $fail"
    fi
}

join_arr() {
    local IFS=","
    shift
    echo "$*"
}

test_redirect(){
    test_url="$1"
    expected_resp="$2"
    host_header="${4:-wnyc-client.nuxt.nypr.digital}"
    expected_url="$([[ $3 == http* ]] && echo "$3" || echo "http://$host_header$3")"

    test_host="http://localhost"

    test_urls=("$test_url")

    for url in "${test_urls[@]}"; do
        IFS='|' read returned_resp returned_url time_total <<<$(curl -H "Host: $host_header" -sI "$test_host$url" -o /dev/null -w "%{http_code}|%{redirect_url}|%{time_total}")
        if [[ ! "${returned_url}" == "${expected_url}" ]] || [[ ! "${returned_resp}" == "${expected_resp}" ]]; then
            fail "(${time_total}s) $url returned $returned_resp -> $returned_url instead of $expected_resp -> ${expected_url}"
        else
            pass "(${time_total}s) $url returned $returned_resp -> $returned_url"
        fi
    done
}

test_status(){
    test_url="$1"
    expected_resp="$2"

    read returned_resp time_total <<<$(curl -H "Host: lab.wnyc.org" -sI "http://localhost$test_url" -o /dev/null -w "%{http_code} %{time_total}")
    if [[ ! "${returned_resp}" == "${expected_resp}" ]]; then
        fail "(${time_total}s) $test_url returned $returned_resp instead of $expected_resp"
    else
        pass "(${time_total}s) $test_url returned $returned_resp"
    fi
}

# Tests Below Here

title "Checking config for syntax errors..."
nginx -g "daemon off;" -t
nc -z 127.0.0.1 80 || nginx -g "daemon on;"

title "Checking trailing slash rewrite..."
test_redirect /foo/ 301 /foo

totals
