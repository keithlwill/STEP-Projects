//Copyright 2019 Google LLC
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
import com.google.gson.Gson; 
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns a random meal. */


@WebServlet("/data")
public final class DataServlet extends HttpServlet {

  private ArrayList<String> comments;

  @Override
  public void init() {
    comments = new ArrayList<>();
    comments.add("Comment #1");
    comments.add("Comment #2");
    comments.add("Comment #3");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
   //convert comments to JSON
    String json = convertToJsonUsingGson(comments);
    
    //Send JSON as response
    response.setContentType("applications/json;");
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      //get input from form in correct format
      String userComment = getComment(request);
      comments.add(userComment);

      //redirect back to HTML page
      response.sendRedirect("/index.html");
  }

    /*returns comment inputted into form in correct format*/
  private String getComment(HttpServletRequest request) {
      //get name from form
      String name = request.getParameter("name");
      //get comment from form
      String comment = request.getParameter("comment");

      String ret = name + " says: " + comment;
      return ret;
  }

  private String convertToJsonUsingGson(ArrayList<String> list) {
    Gson gson = new Gson();
    String json = gson.toJson(list);
    return json;
  }
}
