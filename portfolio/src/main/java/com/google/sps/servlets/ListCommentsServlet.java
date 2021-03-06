// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Entry;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing comments. */
@WebServlet("/list-comments")
public class ListCommentsServlet extends HttpServlet {

  //Retrieve comments from datastore, convert them to JSON so they can be displayed in the webapp
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Entry").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    
    int numComments = commentsDisplayed(request);

    int index = 0;

    List<Entry> comments = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
        if (index >= numComments) {
            break;
        }
        long id = entity.getKey().getId();
        String name = (String) entity.getProperty("name");
        String content = (String) entity.getProperty("content");
        long timestamp = (long) entity.getProperty("timestamp");

        Entry commentToAdd = new Entry(id, name, content, timestamp);
        comments.add(commentToAdd);
        index ++;
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(comments));
  }

  //helper function, convert requested number of comments to display to an int value
  private int commentsDisplayed(HttpServletRequest request) {
    //display request
    String numCommentsString = request.getParameter("num-comments");  
    int numComments = 0;

    try {
    numComments = Integer.parseInt(numCommentsString);
    } catch (NumberFormatException e) {
        System.err.println("Could not convert to int: " + numCommentsString);
    }
    return numComments;
  }
}
